export type BlockRateType = {
    basechain: number;
    masterchain: number;
}

export type TPSType = {
    block_rate: BlockRateType;
    shardchains: number;
    tps: number;
    validators: {
        online: number;
        total: number;
    }
}

export type Point = {
    x: string;
    y: number;
}

export type UptimesDataType = {
    host: string;
    response_times: number[];
    timestamps: number[];
    uptimes: number[];
}

export type GraphProps = {
    title: string;
    firstGraph: Point[];
    secondGraph: Point[];
    accessors: {
        xAccessor: (d: any) => void
        yAccessor: (d: any) => void
    }
}


export type InfoBlockProps = {
    model: TPSType;
}