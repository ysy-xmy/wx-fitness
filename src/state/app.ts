import { defineStore } from 'pinia';

interface AppState {
    conunt: number;
    active: string;
}

export const useAppStore = defineStore({
    id: 'app-store',
    state: (): AppState => ({
        conunt: 1,
        active: 'mine',
    }),
    getters: {
        getNum(): number {
            return this.conunt;
        },
        getcurrentactive(): string {
            return this.active;
        },
        getCurrentDate(): string {
            const now = new Date();
            const year = now.getFullYear();
            const month = (now.getMonth() + 1).toString().padStart(2, '0');
            const day = now.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        }

    },
    actions: {
        addnum() {
            this.conunt++;
        },
        setactive(active: string) {
            this.active = active;
        }

    },
});
