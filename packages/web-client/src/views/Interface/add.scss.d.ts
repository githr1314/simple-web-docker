declare namespace AddScssNamespace {
  export interface IAddScss {
    content: string;
  }
}

declare const AddScssModule: AddScssNamespace.IAddScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: AddScssNamespace.IAddScss;
};

export = AddScssModule;
