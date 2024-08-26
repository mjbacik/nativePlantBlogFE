import { User } from "../shared/user";
import { Image } from "../shared/image";

export class Post {
	_id: string;
	title: string;
	user: User;
	text: string;
	images: Image[];
}
