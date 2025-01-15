declare module "html2pdf.js" {
  const html2pdf: {
    (element: HTMLElement | string, opts?: object): Promise<HTMLElement>;
    from(element: HTMLElement | string, opts?: object): Promise<HTMLElement>;
  };

  export default html2pdf;
}
