declare namespace StyleScssNamespace {
  export interface IStyleScss {
    addBar: string;
    delete: string;
    des: string;
    project: string;
    projectContent: string;
    projectList: string;
    title: string;
  }
}

declare const StyleScssModule: StyleScssNamespace.IStyleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleScssNamespace.IStyleScss;
};

export = StyleScssModule;
