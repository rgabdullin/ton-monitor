import { texts } from './texts';
import { TPSType, InfoBlockItemProps, InfoBlockModel } from './types';

export const getText = (key: string) => {
    return texts[key] || "";
}

export const getRenderModel: (model: InfoBlockModel) => InfoBlockItemProps[] = (model: InfoBlockModel) => [
    {
      xs: 6,
      md: 3,
      value: getRoundValue(model.tps.transactions_per_second),
      labelKey: "tps.tps",
    },
    
    {
      xs: 6,
      md: 3,
      labelKey: "tps.validators",
      isSplitted: true,
      splitedArray: [
        {
          xs: 6,
          md: 3,
          value: String(model.validatorCounts.online),
          labelKey: "tps.validators.online",
        },
        {
          xs: 6,
          md: 3,
          value: String(model.validatorCounts.total),
          labelKey: "tps.validators.total",
        },
      ],
    },
    {
      xs: 6,
      md: 3,
      labelKey: "tps.block_rate",
      isSplitted: true,
      splitedArray: [
        {
            xs: 6,
            md: 3,
            value: getRoundValue(model.blockRate[0].blocks_per_second ),
            labelKey: "tps.block_rate.basechain",
          },
          {
            xs: 6,
            md: 3,
            value: getRoundValue(model.blockRate[1].blocks_per_second ),
            labelKey: "tps.block_rate.masterchain",
          },
      ],
    },
    {
        xs: 6,
        md: 3,
        value: String(model.shardchains),
        labelKey: "tps.shardchains",
      },
  ];

export const getRoundValue:(value: number) => string = (value: number) => {
  return String(parseInt(String(value * 100)) /100)
}  