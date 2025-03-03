declare global{
  interface IRequestParams {
    url: string,
    method?: 'GET' | 'POST',
    data: any,
    isNotify?: boolean,
    isPost?: boolean,
    isGet?: boolean,
    isUploadFile?: boolean,
    isDownloadFile?: boolean
  }
}

export {}
