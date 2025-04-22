import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ComponentPropsWithoutRef } from 'react';

type ShinyButtonProps = ComponentPropsWithoutRef<typeof Button>;

export const ShinyButton = ({ ...props }: ShinyButtonProps) => {
  return (
    <Button
      {...props}
      className={cn(
        'animate-bg-shine border-[1px] rounded-lg shadow bg-[length:200%_100%] tracking-wide',
        'bg-[linear-gradient(110deg,#1e40af,45%,#3b82f6,55%,#1e40af)] text-white border-blue-700',
        props.className,
      )}
    />
  );
}; 