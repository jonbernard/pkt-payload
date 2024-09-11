import { SerializedLexicalNode } from './types';

const Video = (content: SerializedLexicalNode) => {
  return (
    <iframe
      className="aspect-video w-full border-0"
      src={content.fields.url}
      title={content.fields.title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
};

export default Video;
