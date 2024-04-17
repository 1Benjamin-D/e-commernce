import Link from "next/link"

interface ModifyInput {
    name: string
    value: string
    editable: boolean
    link?: string
}
export default function ModifyInput({ name, value, editable, link }: ModifyInput) {
    return (
        <div className="flex justify-between items-center">
            <p className="text-center text-wrap font-bold w-40">{name}</p>
            <div className="rounded-lg bg-gradient-to-br from-[#FF5863] via-[#FD8F50] to-[#FFC53E] p-px w-[30rem]">
                <div className="p-2 bg-gray-300 text-center rounded-[calc(0.5rem-1px)]">
                    <p>{value}</p>
                </div>
            </div>
            {editable && (
                <Link href={link!} className="w-40 text-center">Modifier</Link>
            )}
        </div>
    )
}