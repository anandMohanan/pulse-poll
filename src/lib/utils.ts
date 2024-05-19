import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { ZodIssue } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const zodIssuesFormatter = (issues: ZodIssue[]) => {
  const errors = issues.map((issue) => {
    const path = issue.path.join('.');
    const message = issue.message;
    return `${message}`;
  });

  return errors.join('\n');
};
