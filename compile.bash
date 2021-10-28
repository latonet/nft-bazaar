npx asc src/assembly/hook.ts \
  -O3 \
  --noAssert \
  --runtime minimal \
  -b build/hook.wasm \
  -t build/hook.wat \
  -d build/hook.d.ts