export interface IData {
    data: number[],
    month: number[],
    label: string,
    color: string,
    line: boolean
}

export interface IOneData {
    years: {
        labels: [],
        data: IData[]
    },
    month: {
        labels: [],
        data: IData[]
    }
}

export interface ISummaryData {
    grossProduct: IOneData
    govBudget: IOneData
    currency: IOneData
    population: IOneData

}