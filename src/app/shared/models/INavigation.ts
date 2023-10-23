export interface INavigation {
    label: string;
    path: string;
    key: string;
    isActive: boolean;
    parentKey?: string;
    expanded?: boolean;
    children?: INavigation[];
}