// Posiciones y tamaños de estrellas predefinidas para evitar cálculos en render
const STARS = [
  { x: 5, y: 10, size: 1, delay: 'star-delay-1' },
  { x: 15, y: 20, size: 1.5, delay: 'star-delay-2' },
  { x: 25, y: 5, size: 1, delay: 'star-delay-3' },
  { x: 35, y: 30, size: 1, delay: 'star-delay-4' },
  { x: 45, y: 15, size: 1.5, delay: 'star-delay-5' },
  { x: 55, y: 25, size: 1, delay: 'star-delay-6' },
  { x: 65, y: 8, size: 1, delay: 'star-delay-1' },
  { x: 75, y: 35, size: 1.5, delay: 'star-delay-2' },
  { x: 85, y: 12, size: 1, delay: 'star-delay-3' },
  { x: 95, y: 28, size: 1, delay: 'star-delay-4' },
  { x: 10, y: 40, size: 1.5, delay: 'star-delay-5' },
  { x: 20, y: 50, size: 1, delay: 'star-delay-6' },
  { x: 30, y: 45, size: 1, delay: 'star-delay-1' },
  { x: 40, y: 60, size: 1.5, delay: 'star-delay-2' },
  { x: 50, y: 55, size: 1, delay: 'star-delay-3' },
  { x: 60, y: 42, size: 1, delay: 'star-delay-4' },
  { x: 70, y: 58, size: 1.5, delay: 'star-delay-5' },
  { x: 80, y: 48, size: 1, delay: 'star-delay-6' },
  { x: 90, y: 52, size: 1, delay: 'star-delay-1' },
  { x: 12, y: 65, size: 1.5, delay: 'star-delay-2' },
  { x: 22, y: 72, size: 1, delay: 'star-delay-3' },
  { x: 32, y: 68, size: 1, delay: 'star-delay-4' },
  { x: 42, y: 75, size: 1.5, delay: 'star-delay-5' },
  { x: 52, y: 70, size: 1, delay: 'star-delay-6' },
  { x: 62, y: 78, size: 1, delay: 'star-delay-1' },
  { x: 72, y: 65, size: 1.5, delay: 'star-delay-2' },
  { x: 82, y: 73, size: 1, delay: 'star-delay-3' },
  { x: 92, y: 68, size: 1, delay: 'star-delay-4' },
  { x: 8, y: 80, size: 1.5, delay: 'star-delay-5' },
  { x: 18, y: 85, size: 1, delay: 'star-delay-6' },
  { x: 28, y: 82, size: 1, delay: 'star-delay-1' },
  { x: 38, y: 88, size: 1.5, delay: 'star-delay-2' },
  { x: 48, y: 83, size: 1, delay: 'star-delay-3' },
  { x: 58, y: 90, size: 1, delay: 'star-delay-4' },
  { x: 68, y: 85, size: 1.5, delay: 'star-delay-5' },
  { x: 78, y: 92, size: 1, delay: 'star-delay-6' },
  { x: 88, y: 87, size: 1, delay: 'star-delay-1' },
];

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-br from-blue-950/20 via-black to-blue-950/20">
      {STARS.map((star, index) => (
        <div
          key={index}
          className={`star ${star.delay}`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
        />
      ))}
    </div>
  );
}