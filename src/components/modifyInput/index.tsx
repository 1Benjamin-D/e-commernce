interface ModifyInput {
    name: string
    value: string
}
export default function ModifyInput({ name, value }: ModifyInput) {
    return (
        <div className="flex justify-between items-center">
            <p className="text-nowrap">{name}</p>
            <div className="rounded-lg bg-gradient-to-br from-[#FF5863] via-[#FD8F50] to-[#FFC53E] p-px w-1/2">
                <div className="p-1 bg-gray-300 text-center rounded-[calc(0.5rem-1px)]">
                    <p>{value}</p>
                </div>
            </div>
            <button>Modifier</button>
        </div>
    )
}