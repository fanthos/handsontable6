import {
  CellType as HyperFormulaCellType,
  ConfigParams,
  HyperFormula,
} from 'hyperformula';
import { BasePlugin } from '../base';

export interface HyperFormulaSettings extends Partial<ConfigParams> {
  hyperformula: typeof HyperFormula | HyperFormula
}
export interface Settings {
  engine: typeof HyperFormula | HyperFormula | HyperFormulaSettings
}

export class Formulas extends BasePlugin {
  constructor(hotInstance: any);

  engine: HyperFormula | null;
  sheetName: string | null;
  get sheetId(): number | null;

  isEnabled(): boolean;
  addSheet(sheetName?: string | null, sheetData?: any[][]): string | boolean;
  switchSheet(sheetName: string): void;
  getCellType(row: number, column: number, sheet?: number): HyperFormulaCellType;
  isFormulaCellType(row: number, column: number, sheet?: number): boolean;
}
