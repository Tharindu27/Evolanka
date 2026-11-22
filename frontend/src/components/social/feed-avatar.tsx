import type { FeedAuthor } from '@/data/social-feed-data';

const sizes = {
  sm: 'h-9 w-9 text-sm',
  lg: 'h-full w-full text-xl',
};

export default function FeedAvatar({ author, size = 'sm' }: { author: FeedAuthor; size?: keyof typeof sizes }) {
  const tone =
    author.role === 'provider'
      ? 'bg-[linear-gradient(135deg,#f3dc8a,#c9a227)] text-[#3b2f05]'
      : 'bg-[linear-gradient(135deg,#bcd3ff,#5f8ee8)] text-[#001a43]';

  return (
    <div className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full font-bold ${sizes[size]} ${tone}`}>
      {author.avatar ? <img src={author.avatar} alt={author.name} className="h-full w-full object-cover" /> : author.name.charAt(0)}
    </div>
  );
}
