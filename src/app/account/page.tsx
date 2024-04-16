import ModifyInput from "@/components/modifyInput";

export default function Page() {
    return (
        <div className="flex justify-center items-center">
            <div className="bg-gradient-to-br from-[#FF5863] via-[#FD8F50] to-[#FFC53E] p-px w-full">
                <div className="bg-white flex flex-col gap-10 p-6">
                    <ModifyInput name="Nom" value="test" />
                    <ModifyInput name="Email" value="test" />
                    <ModifyInput name="Numéro de téléphone" value="test" />
                </div>
            </div>
        </div>
    )
}