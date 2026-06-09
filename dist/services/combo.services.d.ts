import { ComboModel } from "../models/combo.model";
type CreateComboDTO = {
    name: string;
    description?: string | null;
    price: number;
    image?: string;
    foodIds: string[];
};
type UpdateComboDTO = Partial<CreateComboDTO>;
export declare class ComboService {
    static createCombo(payload: CreateComboDTO): Promise<ComboModel>;
    static getAllCombos(): Promise<ComboModel[]>;
    static getComboById(id: string): Promise<ComboModel>;
    static updateCombo(id: string, payload: UpdateComboDTO): Promise<ComboModel | null>;
    static deleteCombo(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    static toggleComboStatus(id: string): Promise<ComboModel>;
}
export {};
//# sourceMappingURL=combo.services.d.ts.map