export const login = [
    {
        id: "11111111",
        pass: "a"
    },
    {
        id: "22222222",
        pass: "b"
    },
    {
        id: "33333333",
        pass: "c"
    },
    {
        id: "44444444",
        pass: "d"
    },
    {
        id: "55555555",
        pass: "e"
    },
    {
        id: "66666666",
        pass: "f"
    },
    {
        id: "77777777",
        pass: "g"
    },
]

export const result = [
    {
        sub: "A+",
        marks: 85,
        terms: "Term 1 * 2025"
    },
    {
        sub: "Multimedia",
        marks: 92,
        terms: "Term 1 * 2025"
    },
    {
        sub: "Web design",
        marks: 78,
        terms: "Term 1 * 2025"
    },
    {
        sub: "Networking",
        marks: 88,
        terms: "Term  1* 2025"
    },
    {
        sub: "Database",
        marks: 88,
        terms: "Term 1 * 2025"
    },
    {
        sub: "programing",
        marks: 88,
        terms: "Term 1 * 2025"
    }
]

export const student = [
    {
        name: "Mustafa abdi",
        id: "STD-2025-001"
    },
    {
        name: "Ahmed mohamed",
        id: "STD-2025-002"
    },
    {
        name: "Mukhtar daa'uud",
        id: "STD-2025-003"
    },
    {
        name: "Xafsa maxamed",
        id: "STD-2025-004"
    },
    {
        name: "Muna saalx",
        id: "STD-2025-005"
    },
    {
        name: "Faysal abubakar",
        id: "STD-2025-006"
    },
]

export const randomLogin = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}