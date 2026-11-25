import { useEffect, useRef } from 'react';
import { generateParticleBust } from '../utils/generateParticleBust';

const VERTEX_SHADER = `
  attribute vec3 aPosition;
  attribute vec3 aColor;
  attribute float aSize;
  attribute float aAlpha;

  uniform float uScaleX;
  uniform float uScaleY;
  uniform float uOffsetY;
  uniform float uDpr;
  uniform float uGlobalAlpha;
  uniform float uCosY;
  uniform float uSinY;
  uniform float uCosX;
  uniform float uSinX;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Rotate around Y (yaw) then X (pitch)
    float x1 = aPosition.x * uCosY - aPosition.z * uSinY;
    float z1 = aPosition.z * uCosY + aPosition.x * uSinY;
    float y2 = aPosition.y * uCosX - z1 * uSinX;
    float z2 = z1 * uCosX + aPosition.y * uSinX;

    float dist = 2.65;
    float fov = 2.95;
    float denom = max(0.45, dist - z2);
    float persp = fov / denom;

    float ndcX = x1 * persp * uScaleX;
    float ndcY = y2 * persp * uScaleY + uOffsetY;

    gl_Position = vec4(ndcX, ndcY, clamp(-z2 * 0.25, -0.99, 0.99), 1.0);

    float depthFade = clamp((z2 + 0.65) / 1.15, 0.28, 1.0);
    gl_PointSize = clamp(aSize * persp * uDpr * 1.18, 1.15, 6.2);
    vColor = aColor;
    vAlpha = aAlpha * depthFade * uGlobalAlpha;
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 c = gl_PointCoord - vec2(0.5);
    float d = dot(c, c);
    if (d > 0.25) discard;
    float soft = 1.0 - smoothstep(0.08, 0.25, d);
    gl_FragColor = vec4(vColor, vAlpha * soft);
  }
`;

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function clamp(v: number, lo: number, hi: number): number {
  return v < lo ? lo : v > hi ? hi : v;
}

function smoothstep(e0: number, e1: number, x: number): number {
  const t = clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
}

export function ParticleSelfCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const auraRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      depth: false,
      powerPreference: 'high-performance',
    });

    const isMobile = window.innerWidth < 768;
    const densityScale = gl ? (isMobile ? 0.65 : 1.0) : isMobile ? 0.24 : 0.32;
    const data = generateParticleBust(densityScale);
    const {
      count,
      basePositions,
      scatterPositions,
      colors,
      sizes,
      brightness,
      phases,
    } = data;

    // Live physics buffers
    const positions = new Float32Array(basePositions);
    const velocities = new Float32Array(count * 3);

    // Viewport state
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Pointer state in normalized viewport [-1, 1]
    let pointerActive = false;
    let pointerNdcX = 0;
    let pointerNdcY = 0;
    let smoothPtrX = 0;
    let smoothPtrY = 0;

    // Scroll state (0 at hero top, 1 when scrolled ~90vh down)
    let targetScrollMorph = 0;
    let currentScrollMorph = 0;

    // WebGL handles (if supported)
    let program: WebGLProgram | null = null;
    let posBuffer: WebGLBuffer | null = null;
    let uScaleX: WebGLUniformLocation | null = null;
    let uScaleY: WebGLUniformLocation | null = null;
    let uOffsetY: WebGLUniformLocation | null = null;
    let uDpr: WebGLUniformLocation | null = null;
    let uGlobalAlpha: WebGLUniformLocation | null = null;
    let uCosY: WebGLUniformLocation | null = null;
    let uSinY: WebGLUniformLocation | null = null;
    let uCosX: WebGLUniformLocation | null = null;
    let uSinX: WebGLUniformLocation | null = null;
    let ctx2d: CanvasRenderingContext2D | null = null;

    if (gl) {
      const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
      const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
      if (vs && fs) {
        program = gl.createProgram();
        if (program) {
          gl.attachShader(program, vs);
          gl.attachShader(program, fs);
          gl.linkProgram(program);

          if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
            gl.useProgram(program);

            // Dynamic positions buffer
            posBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW);
            const aPosition = gl.getAttribLocation(program, 'aPosition');
            gl.enableVertexAttribArray(aPosition);
            gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);

            // Static color buffer
            const colorBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
            const aColor = gl.getAttribLocation(program, 'aColor');
            gl.enableVertexAttribArray(aColor);
            gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 0, 0);

            // Static size buffer
            const sizeBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW);
            const aSize = gl.getAttribLocation(program, 'aSize');
            gl.enableVertexAttribArray(aSize);
            gl.vertexAttribPointer(aSize, 1, gl.FLOAT, false, 0, 0);

            // Static brightness/alpha buffer
            const alphaBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, alphaBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, brightness, gl.STATIC_DRAW);
            const aAlpha = gl.getAttribLocation(program, 'aAlpha');
            gl.enableVertexAttribArray(aAlpha);
            gl.vertexAttribPointer(aAlpha, 1, gl.FLOAT, false, 0, 0);

            uScaleX = gl.getUniformLocation(program, 'uScaleX');
            uScaleY = gl.getUniformLocation(program, 'uScaleY');
            uOffsetY = gl.getUniformLocation(program, 'uOffsetY');
            uDpr = gl.getUniformLocation(program, 'uDpr');
            uGlobalAlpha = gl.getUniformLocation(program, 'uGlobalAlpha');
            uCosY = gl.getUniformLocation(program, 'uCosY');
            uSinY = gl.getUniformLocation(program, 'uSinY');
            uCosX = gl.getUniformLocation(program, 'uCosX');
            uSinX = gl.getUniformLocation(program, 'uSinX');

            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            gl.clearColor(0, 0, 0, 0);
          } else {
            program = null;
          }
        }
      }
    }

    if (!gl || !program) {
      ctx2d = canvas.getContext('2d');
    }

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      if (gl && program) {
        gl.viewport(0, 0, canvas.width, canvas.height);
      } else if (ctx2d) {
        ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    };

    const onScroll = () => {
      const ratio = window.scrollY / Math.max(1, window.innerHeight * 0.85);
      targetScrollMorph = smoothstep(0.04, 1.0, ratio);
    };

    const onPointerMove = (e: PointerEvent) => {
      pointerActive = true;
      pointerNdcX = (e.clientX / Math.max(1, width)) * 2 - 1;
      pointerNdcY = -((e.clientY / Math.max(1, height)) * 2 - 1);
    };

    const onPointerLeave = () => {
      pointerActive = false;
    };

    resize();
    onScroll();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave);

    let rafId = 0;
    let time = 0;

    const step = () => {
      if (document.hidden) {
        rafId = window.requestAnimationFrame(step);
        return;
      }

      // Smooth scroll morph & pointer tilt
      currentScrollMorph += (targetScrollMorph - currentScrollMorph) * 0.085;
      const morph = currentScrollMorph;

      const targetTiltX = pointerActive ? pointerNdcX : 0;
      const targetTiltY = pointerActive ? pointerNdcY : 0;
      smoothPtrX += (targetTiltX - smoothPtrX) * 0.06;
      smoothPtrY += (targetTiltY - smoothPtrY) * 0.06;

      // Update ambient aura fade based on scroll
      if (auraRef.current) {
        const auraOpacity = clamp(1 - morph * 1.15, 0, 1);
        auraRef.current.style.opacity = auraOpacity.toFixed(3);
      }

      // Responsive bust scale & vertical placement matching Particle Self framing:
      // Hair crown enters around top ~26%, broad shoulders dissolve seamlessly at bottom ~100%
      const aspect = width / Math.max(1, height);
      const isPortrait = aspect < 0.78;
      const bustPixelScale = isPortrait
        ? Math.min(height * 0.28, width * 0.44)
        : Math.min(height * 0.355, width * 0.36);
      const scaleX = bustPixelScale / (width * 0.5);
      const scaleY = bustPixelScale / (height * 0.5);
      const offsetY = isPortrait ? 0.02 : -0.27;

      // Subtle breathing + mouse parallax yaw/pitch + gentle scroll rotation
      const idleYaw = reducedMotion ? -0.08 : -0.08 + Math.sin(time * 0.45) * 0.04;
      const yaw = idleYaw + smoothPtrX * 0.24 * (1 - morph * 0.5) + morph * 0.55;
      const pitch =
        (reducedMotion ? 0.02 : 0.02 + Math.cos(time * 0.35) * 0.015) -
        smoothPtrY * 0.12 * (1 - morph * 0.5);

      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const cosX = Math.cos(pitch);
      const sinX = Math.sin(pitch);

      const globalAlpha = 1 - morph * 0.76;

      // Update particle spring physics & magnetic cursor crater repulsion
      const interactActive = pointerActive && morph < 0.55 && !reducedMotion;
      const repulseRadiusPx = Math.min(width, height) * 0.125;
      const repulseRadiusNdcX = (repulseRadiusPx / (width * 0.5));
      const repulseRadiusNdcY = (repulseRadiusPx / (height * 0.5));

      const spring = 0.092;
      const damping = 0.78;
      const invScaleX = 1 / Math.max(0.001, scaleX);
      const invScaleY = 1 / Math.max(0.001, scaleY);

      if (!reducedMotion) {
        const driftAngle = time * 0.08;
        const driftCos = Math.cos(driftAngle);
        const driftSin = Math.sin(driftAngle);

        for (let i = 0; i < count; i++) {
          const i3 = i * 3;
          const bx = basePositions[i3];
          const by = basePositions[i3 + 1];
          const bz = basePositions[i3 + 2];

          const sx = scatterPositions[i3];
          const sy = scatterPositions[i3 + 1];
          const sz = scatterPositions[i3 + 2];

          // Gently rotate scattered background constellation
          const rsx = sx * driftCos - sz * driftSin;
          const rsz = sz * driftCos + sx * driftSin;

          // Target position blends smoothly between sculpted bust and 3D ambient constellation
          const ph = phases[i];
          const breath = Math.sin(time * 1.15 + ph) * 0.0038 * (1 - morph * 0.4);

          const tx = bx + (rsx - bx) * morph + breath;
          const ty = by + (sy - by) * morph + Math.cos(time * 0.9 + ph) * 0.0035;
          const tz = bz + (rsz - bz) * morph;

          let px = positions[i3];
          let py = positions[i3 + 1];
          let pz = positions[i3 + 2];

          let vx = (velocities[i3] + (tx - px) * spring) * damping;
          let vy = (velocities[i3 + 1] + (ty - py) * spring) * damping;
          let vz = (velocities[i3 + 2] + (tz - pz) * spring) * damping;

          // Interactive cursor repulsion crater (exact feel of Particle Self!)
          if (interactActive) {
            const rx1 = px * cosY - pz * sinY;
            const rz1 = pz * cosY + px * sinY;
            const ry2 = py * cosX - rz1 * sinX;
            const rz2 = rz1 * cosX + py * sinX;

            const persp = 2.95 / Math.max(0.45, 2.65 - rz2);
            const ndcX = rx1 * persp * scaleX;
            const ndcY = ry2 * persp * scaleY + offsetY;

            const dx = (ndcX - pointerNdcX) / repulseRadiusNdcX;
            const dy = (ndcY - pointerNdcY) / repulseRadiusNdcY;
            const distSq = dx * dx + dy * dy;

            if (distSq < 1.0 && distSq > 0.00001) {
              const dist = Math.sqrt(distSq);
              const force = Math.pow(1 - dist, 1.65) * 0.058 * (1 - morph);
              // Push radially outward in screen plane, transformed cleanly back to model space
              const pushScreenX = (dx / dist) * force * repulseRadiusNdcX * invScaleX / persp;
              const pushScreenY = (dy / dist) * force * repulseRadiusNdcY * invScaleY / persp;
              const pushZ = (1 - dist) * 0.022;

              // Inverse rotate Y approximately for responsive feel
              vx += pushScreenX * cosY + pushZ * sinY;
              vy += pushScreenY;
              vz += -pushScreenX * sinY + pushZ * cosY;
            }
          }

          px += vx;
          py += vy;
          pz += vz;

          positions[i3] = px;
          positions[i3 + 1] = py;
          positions[i3 + 2] = pz;

          velocities[i3] = vx;
          velocities[i3 + 1] = vy;
          velocities[i3 + 2] = vz;
        }
      } else {
        // Static reduced-motion blend on scroll only
        for (let i = 0; i < count; i++) {
          const i3 = i * 3;
          positions[i3] =
            basePositions[i3] + (scatterPositions[i3] - basePositions[i3]) * morph;
          positions[i3 + 1] =
            basePositions[i3 + 1] +
            (scatterPositions[i3 + 1] - basePositions[i3 + 1]) * morph;
          positions[i3 + 2] =
            basePositions[i3 + 2] +
            (scatterPositions[i3 + 2] - basePositions[i3 + 2]) * morph;
        }
      }

      // Render frame
      if (gl && program && posBuffer) {
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, positions);

        gl.uniform1f(uScaleX, scaleX);
        gl.uniform1f(uScaleY, scaleY);
        gl.uniform1f(uOffsetY, offsetY);
        gl.uniform1f(uDpr, dpr);
        gl.uniform1f(uGlobalAlpha, globalAlpha);
        gl.uniform1f(uCosY, cosY);
        gl.uniform1f(uSinY, sinY);
        gl.uniform1f(uCosX, cosX);
        gl.uniform1f(uSinX, sinX);

        gl.drawArrays(gl.POINTS, 0, count);
      } else if (ctx2d) {
        ctx2d.clearRect(0, 0, width, height);
        const halfW = width * 0.5;
        const halfH = height * 0.5;
        for (let i = 0; i < count; i++) {
          const i3 = i * 3;
          const x = positions[i3];
          const y = positions[i3 + 1];
          const z = positions[i3 + 2];

          const x1 = x * cosY - z * sinY;
          const z1 = z * cosY + x * sinY;
          const y2 = y * cosX - z1 * sinX;
          const z2 = z1 * cosX + y * sinX;

          const persp = 2.95 / Math.max(0.45, 2.65 - z2);
          const sx = halfW + x1 * persp * scaleX * halfW;
          const sy = halfH - (y2 * persp * scaleY + offsetY) * halfH;

          const depthFade = clamp((z2 + 0.65) / 1.15, 0.28, 1.0);
          const alpha = brightness[i] * depthFade * globalAlpha;
          if (alpha < 0.04) continue;

          const r = Math.round(colors[i3] * 255);
          const g = Math.round(colors[i3 + 1] * 255);
          const b = Math.round(colors[i3 + 2] * 255);
          const sz = Math.max(1.1, sizes[i] * persp * 0.95);
          ctx2d.fillStyle = `rgba(${r},${g},${b},${alpha.toFixed(2)})`;
          ctx2d.fillRect(sx, sy, sz, sz);
        }
      }

      time += 0.016;
      rafId = window.requestAnimationFrame(step);
    };

    rafId = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20 overflow-hidden"
    >
      {/* Signature ethereal lavender head aura + warm chartreuse-gold shoulder bloom */}
      <div
        ref={auraRef}
        className="absolute inset-0 mix-blend-screen transition-opacity duration-150"
      >
        {/* Soft lavender rim aura behind head (centered around top ~46%) */}
        <div
          className="absolute left-1/2 top-[46%] h-[320px] w-[280px] sm:h-[390px] sm:w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[86px] animate-pulse-soft"
          style={{
            background:
              'radial-gradient(circle, rgba(167, 139, 250, 0.25) 0%, rgba(139, 92, 246, 0.11) 48%, transparent 74%)',
          }}
        />
        {/* Warm acid-gold / chartreuse glow blooming across left & right shoulders */}
        <div
          className="absolute left-1/2 bottom-[-8%] h-[280px] w-[580px] sm:h-[320px] sm:w-[780px] -translate-x-1/2 rounded-full blur-[95px]"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(229, 240, 78, 0.23) 0%, rgba(196, 212, 68, 0.10) 48%, transparent 74%)',
          }}
        />
      </div>

      {/* 20,000-Particle Interactive Scroll-Driven 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="relative z-10 block h-full w-full" />
    </div>
  );
}
