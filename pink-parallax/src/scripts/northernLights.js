import * as THREE from 'three';

// Simple pseudo-random function
function random(st) {
    return fract(Math.sin(st.x * 12.9898 + st.y * 78.233) * 43758.5453123);
}

// 2D Noise function (simplified Perlin-like)
function noise(st) {
    const i = { x: Math.floor(st.x), y: Math.floor(st.y) };
    const f = { x: st.x - i.x, y: st.y - i.y };

    const a = random({ x: i.x, y: i.y });
    const b = random({ x: i.x + 1.0, y: i.y });
    const c = random({ x: i.x, y: i.y + 1.0 });
    const d = random({ x: i.x + 1.0, y: i.y + 1.0 });

    const u = { x: f.x * f.x * (3.0 - 2.0 * f.x), y: f.y * f.y * (3.0 - 2.0 * f.y) };

    return lerp(lerp(a, b, u.x), lerp(c, d, u.x), u.y);
}

function lerp(a, b, t) {
    return a + (b - a) * t;
}

function fract(x) {
    return x - Math.floor(x);
}


export function initNorthernLights(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.error(`Canvas element with ID '${canvasId}' not found.`);
    return;
  }

  let scene, camera, renderer;
  let auroraMesh;
  let uniforms;

  function init() {
    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Northern Lights Shader Material
    uniforms = {
      time: { value: 0.0 },
      resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      color1: { value: new THREE.Color(0x00ff00) }, // Greenish
      color2: { value: new THREE.Color(0x0000ff) }, // Bluish
      noiseScale: { value: 0.001 },
      speed: { value: 0.1 },
      density: { value: 1.0 }
    };

    const auroraMaterial = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: `
        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec2 resolution;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform float noiseScale;
        uniform float speed;
        uniform float density;

        // Simple pseudo-random function
        float random(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }

        // 2D Noise function (simplified Perlin-like)
        float noise(vec2 st) {
            vec2 i = floor(st);
            vec2 f = fract(st);

            // Four corners of a square in 2D space
            float a = random(i);
            float b = random(i + vec2(1.0, 0.0));
            float c = random(i + vec2(0.0, 1.0));
            float d = random(i + vec2(1.0, 1.0));

            vec2 u = f * f * (3.0 - 2.0 * f); // Smoothstep interpolation

            return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
        }

        void main() {
          vec2 uv = gl_FragCoord.xy / resolution.xy;
          vec2 p = uv * noiseScale; // Scale the UVs for noise

          // Animate noise over time
          p.x += time * speed;
          p.y += time * speed * 0.5;

          float n = noise(p); // Get noise value

          // Create a wavy pattern for aurora bands
          float aurora = sin(uv.x * 20.0 + n * 10.0 + time * 0.2) * 0.5 + 0.5;
          aurora *= sin(uv.y * 15.0 + n * 8.0 + time * 0.3) * 0.5 + 0.5;
          aurora = pow(aurora, density); // Adjust density/sharpness

          // Mix colors based on aurora intensity
          vec3 finalColor = mix(color1, color2, n); // Base color mix
          finalColor *= aurora; // Apply aurora pattern

          // Add some glow/falloff
          float distFromCenter = distance(uv, vec2(0.5, 0.5));
          finalColor *= (1.0 - distFromCenter * 1.5); // Fade towards edges

          gl_FragColor = vec4(finalColor, finalColor.r + finalColor.g + finalColor.b); // Alpha based on color intensity
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending, // Good for glowing effects
    });

    // Create a plane that covers the screen
    const geometry = new THREE.PlaneGeometry(20, 20); // Large enough to cover viewport
    auroraMesh = new THREE.Mesh(geometry, auroraMaterial);
    scene.add(auroraMesh);

    // Position the mesh to fill the screen
    auroraMesh.position.z = -10; // Place it behind the camera's initial view

    window.addEventListener('resize', onWindowResize, false);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
  }

  function animate() {
    requestAnimationFrame(animate);

    if (uniforms.time) {
      uniforms.time.value += 0.01;
    }

    renderer.render(scene, camera);
  }

  console.log("Initializing Northern Lights scene...");
  init();
  animate();
}