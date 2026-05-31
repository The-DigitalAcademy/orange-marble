"use client";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function FilterSelection({ keyName, options, label }: { keyName: string, options: string[], label: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleSelect(value: any) {
        const params = new URLSearchParams(searchParams);
        params.set(keyName, `${value}`)
        replace(`${pathname}?${params.toString()}`)
    };
    return (
        <Select defaultValue={searchParams.get(keyName)} onValueChange={(val) => handleSelect(val)}>
            <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder={`Select ${label}`} />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
                <SelectGroup>
                    <SelectLabel>{label}</SelectLabel>
                    <SelectItem value={""}>{"All"}</SelectItem>
                    {options.map(item =>
                        <SelectItem key={item} className={"[&>*]:whitespace-normal"} value={item}>{item}</SelectItem>
                    )}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
