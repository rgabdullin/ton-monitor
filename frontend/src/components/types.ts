import InfoBlockItem from "./InfoBlock/InfoBlockItem";

export type BlockRateType = {
  blocks_per_second: number;
  seconds_per_block: number;
  workchain_id: string;
};


export type TPSType = {
  transactions_per_second: number;
};

export type ValidatorsType = {
  adnlAddr: string;
  efficiency: number;
  mr: number;
  online: true;
  pubkey: string;
  timestamp: Date;
  weight: number;
  wr: number;
};

export type Point = {
  x: string;
  y: number;
};

export type UptimesDataType = {
  service_name: string;
  response_time: number[];
  timestamp: number[];
  available: number[];
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

export type InfoBlockModel = {
  tps: TPSType;
  blockRate: BlockRateType[];
  validatorCounts: ValidatorCountsType;
  shardchains: number;
};
export type ValidatorCountsType = {
  online: number;
  total: number;
};

export type InfoBlockProps = {
  model: InfoBlockModel;
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
  smart_contract_state: number[];
  url: string;
  web_page_available: number[];
  response_time: number[];
  timestamp: number[];
}

export type LastBlockType = {
  masterchain: string;
  basechain: string;
  shards: number;
}

export type TonBridgesProps = {
  model: TonBridgesItem[];
}

export type TransactionStatsType = {
  gas_used: number;
  total: number;
  transaction_type: string;
  value: number;
}

export type TransactionStatsProps = {
  model: TransactionStatsType[];
}

export type Validator = {
  adnlAddr: string;
  efficiency: number;
  mr: string;
  online: boolean;
  pubkey: string;
  wr: number;
  weight: number;
}