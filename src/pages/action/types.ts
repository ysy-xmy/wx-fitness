type SourceCategory = {
    FirstCategory: {
        ID: number;
        Name: string;
        OrderNum: number;
        CreatedAt: string;
        UpdatedAt: string;
    };
    SecondCategoryInfos?: {
        SecondCategory: {
            ID: number;
            Name: string;
            FirstCategoryID: number;
            OrderNum: number;
            CreatedAt: string;
            UpdatedAt: string;
        };
        ActionInfos?: {
            ActionInfos: {
                ID: number;
                Name: string;
                SecondCategoryID: number;
                OrderNum: number;
                Description: string;
                CreatedAt: string;
            };
            ActionImgInfos?: any[];
            ActionVideoInfos?: any[];
        }[];
    }[];
};

type TargetCategory = {
    name: string;
    id: number;
    OrderNum: number;
    children: TargetCategory[];
};


interface ActionItem {
    name: string;
    id: number;
    children?: ActionItem[];
    OrderNum: number;
    picurl?: string | [];
    videoUrl?: string;
    intro?: string;
    editorder?: boolean;
    active?: boolean;
}
interface ListItem {
    name: string;
    id: number;
    OrderNum: number;
    top?: number;
    bottom?: number;
    children?: ActionItem[];
    editorder?: boolean
    active?: boolean;
}

