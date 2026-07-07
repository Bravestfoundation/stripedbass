interface CategoryTagProps {
  code: string;
  size?: 'sm' | 'md';
}

export function CategoryTag({ code, size = 'sm' }: CategoryTagProps) {
  const tagClass = `tag-${code.toLowerCase()}`;
  const sizeClasses = size === 'sm'
    ? 'text-[10px] px-1.5 py-0.5'
    : 'text-xs px-2 py-1';

  return (
    <span className={`${tagClass} ${sizeClasses} font-bold tracking-wider rounded shrink-0`}>
      {code}
    </span>
  );
}
