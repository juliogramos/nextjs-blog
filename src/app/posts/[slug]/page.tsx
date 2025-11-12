import { format, parseISO } from "date-fns";
import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { getMDXComponent } from "next-contentlayer2/hooks";
import type { MDXComponents } from "mdx/types";
import Image from "next/image";

export const generateStaticParams = async () =>
  allPosts.map((post) => ({ slug: post._raw.flattenedPath }));

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  params = await params;
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);
  return { title: post.title };
};

const mdxComponents: MDXComponents = {
  Image: ({ src, alt, width, height, ...props }) => (
    <Image
      src={src as string}
      alt={alt as string}
      width={width as number}
      height={height as number}
      {...props}
    />
  ),
};

const PostLayout = async ({ params }: { params: { slug: string } }) => {
  params = await params;
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) notFound();
  const MDXContent = getMDXComponent(post.body.code);

  return (
    <article className="mx-auto max-w-xl py-8 prose dark:prose-invert">
      <div className="mb-8 text-center">
        <time dateTime={post.date} className="mb-1 text-xs text-gray-600">
          {format(parseISO(post.date), "LLLL d, yyyy")}
        </time>
        <h1 className="text-3xl font-bold">{post.title}</h1>
      </div>
      <MDXContent components={mdxComponents} />
    </article>
  );
};

export default PostLayout;
