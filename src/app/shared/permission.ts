import { User } from "../shared/user";
import { Image } from "../shared/image";
import { Blog } from "../shared/blog";

export class Permission {
	_id: string;
	user: User;
	blog: Blog;
	permissionType: "read" | "write";
}
