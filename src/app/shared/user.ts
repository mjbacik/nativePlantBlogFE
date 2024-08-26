import { Post } from "../shared/post";
import { Permission } from "../shared/permission";

export class User {
	_id: string;
	email: string;
	password: string;
	firstname: string;
	posts: Post[];
	permissions: Permission[];
}
