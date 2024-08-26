import { Post } from "../shared/post";
import { Image } from "../shared/image";

export class Blog {
	_id: string;
	headerImage: Image;
	subject: string;
	blogPosts: Post[];
	title: string;
}
