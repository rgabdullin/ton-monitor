import InfoBlockItem from "./InfoBlock/InfoBlockItem";

export type BlockRateType = {
  basechain: number;
  masterchain: number;
};

export type TPSType = {
  block_rate: BlockRateType;
  shardchains: number;
  tps: number;
  validators: {
    online: number;
    total: number;
  };
};

export type Point = {
  x: string;
  y: number;
};

export type UptimesDataType = {
  host: string;
  response_times: number[];
  timestamps: number[];
  uptimes: number[];
};

export type GraphProps = {
  title: string;
  firstGraph: Point[];
  secondGraph: Point[];
  accessors: {
    xAccessor: (d: any) => void;
    yAccessor: (d: any) => void;
  };
};

export type InfoBlockProps = {
  model: TPSType;
};

export type DataGridItem = {
  [key: string]: string | number | boolean;
};

export type TColumn = {
  name: string;
  type: string;
  key: string;
};

export type TDataGrid = {
  data: DataGridItem[];
  columns: TColumn[];
};

export type LiteServer = {
  addr: string;
  reponse_time: number;
  syncronized: boolean;
  working: boolean;
}

export type InfoBlockItem = {
  xs?: number;
  md?: number;
  value: string;
  labelKey: string;
}

export type InfoBlockItemProps = Omit<InfoBlockItem, 'value'> & {
  value?: string;
  isSplitted?: boolean;
  splitedArray?: InfoBlockItem[];
  renderComponent?: JSX.Element;
  customClass?: string;
}

export type GovernanceProps = {
  complaints: {
    all: number;
    new: number;
    complaints_list?: any[];
  }
  elections: {
    status: string;
    start: Date;
    end: Date;
    start_next: Date;
  }
  offers: {
    all: number;
    new: number;
    offers_list?: any[];
  }
  timestamp: Date;
}

export type TonBridgesItem = {
  name: string;
  smart_contract_state: string | number | null;
  url: string;
  web_page_status: string
}

export type TonBridgesProps = {
  model: TonBridgesItem[];
}