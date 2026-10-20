// hls.js는 light 빌드의 타입을 따로 내보내지 않는다. 같은 API이므로 전체 빌드 타입을 그대로 쓴다.
declare module "hls.js/light" {
  export { default } from "hls.js";
}
