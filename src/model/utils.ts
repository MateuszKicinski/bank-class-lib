export class IdGenerator {
    private static lastId: number;

    public static generateId() {
        return this.lastId + 1;
    }
}