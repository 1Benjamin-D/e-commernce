interface CustomInput {
    type: string
    name: string
    labelText: string
}
export function CustomInput({type, name, labelText}: CustomInput) {
    return (
        <div className="flex flex-col justify-center items-center gap-4">
            <label htmlFor={name} className="text-2xl mobile:text-lg text-center">{labelText}</label>
            <div className="rounded-lg bg-gradient-to-br from-[#FF5863] via-[#FD8F50] to-[#FFC53E] p-px">
                <input type={type} id={name} name={name} className="p-1 bg-gray-300 text-center rounded-[calc(0.5rem-1px)]"/>
            </div>
        </div>
    )
}