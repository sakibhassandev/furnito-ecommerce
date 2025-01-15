/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/building-your-application/configuring/typescript for more information.

declare module "html2pdf.js" {
  function html2pdf(element: HTMLElement, options?: object): void;

  export = html2pdf;
}
