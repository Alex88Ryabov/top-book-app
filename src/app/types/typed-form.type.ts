import { FormControl } from '@angular/forms';
import {Nullable} from "./nullable.type";

export declare type TypedForm<T> = {
	[key in keyof Partial<T>]: FormControl<Nullable<Partial<T[key]>>>;
};
