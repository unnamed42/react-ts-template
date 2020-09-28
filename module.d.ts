declare module "*.less" {
  const style: Record<string, string>;
  export default style;
}

declare module "*.css" {
  const style: Record<string, string>;
  export default style;
}

declare module "*.png" {
  const path: string;
  export default path;
}
