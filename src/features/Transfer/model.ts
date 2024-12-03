import {NewTransfer, transfer, Transfer} from "../../db/schemas/transfer";
import {db} from "../../db/config/db_connect";
import {ITransferModel} from "../Interfaces/ITransferModel";
import {and, SQL} from "drizzle-orm";

export class TransferModel implements ITransferModel {
  async create(newTransfer: NewTransfer): Promise<Transfer> {
    const createdTransfer = await db.insert(transfer).values(newTransfer).returning();
    return createdTransfer[0];
  }

  async delete(keys: SQL[]): Promise<void> {
    await db.delete(transfer).where(and(...keys));
  }

  async getAll(): Promise<Transfer[]> {
    return db.select().from(transfer);
  }

  async getById(keys: SQL[]): Promise<Transfer | null> {
    const resultTransfer = await db.select().from(transfer).where(and(...keys)).limit(1);
    return resultTransfer[0];
  }

  async update(keys: SQL[], transferData: Partial<Transfer>): Promise<Transfer | null> {
    const updatedTransfer = await db.update(transfer).set(transferData).where(and(...keys)).returning();
    return updatedTransfer[0];
  }
}