

interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'Pendiente: Lorem ipsum23123',
            createdAt: Date.now(),
            status: 'pending'
        },
        {
            description: 'In-Progress: Lorem ipsum',
            createdAt: Date.now() - 1000000,
            status: 'in-progress'
        },
        {
            description: 'Finalizada: Lorem ipsum',
            createdAt: Date.now() - 100000,
            status: 'finished'
        },
        {
            description: 'Pendiente: Lorem ipsum',
            createdAt: Date.now() - 10000,
            status: 'pending'
        }
    ],
}