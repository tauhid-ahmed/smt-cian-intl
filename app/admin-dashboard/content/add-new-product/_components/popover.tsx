"use client"
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { AllArtistsResponse } from "@/lib/api/commonApi"

const SearchArtist = ({
    selectedArtist,
    setSelectedArtist,
    artistDataList
}: {
    selectedArtist: string;
    setSelectedArtist: (artistId: string) => void;
    artistDataList: AllArtistsResponse;
}) => {
    const [open, setOpen] = React.useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between bg-neutral-800 text-white border-none rounded-lg hover:bg-neutral-700 px-4 py-2 h-auto font-normal"
                >
                    <span className={cn(
                        selectedArtist ? "text-white" : "text-gray-500"
                    )}>
                        {selectedArtist
                            ? artistDataList.data.find((artist) => artist.id === selectedArtist)?.name
                            : "Select Artist"}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 bg-neutral-800 border-neutral-700">
                <Command className="bg-neutral-800">
                    <CommandInput
                        placeholder="Search artist..."
                        className="h-9 bg-neutral-800 text-white placeholder:text-gray-500 border-none focus:ring-0"
                    />
                    <CommandList className="bg-neutral-800">
                        <CommandEmpty className="text-gray-500 py-6 text-center text-sm">
                            No artist found.
                        </CommandEmpty>
                        <CommandGroup className="bg-neutral-800">
                            {artistDataList?.data?.map((artist) => (
                                <CommandItem
                                    key={artist.id}
                                    value={artist.name}
                                    onSelect={() => {
                                        setSelectedArtist(artist.id === selectedArtist ? "" : artist.id)
                                        setOpen(false)
                                    }}
                                    className="text-white hover:bg-neutral-700 cursor-pointer aria-selected:bg-neutral-700"
                                >
                                    {artist.name}
                                    <Check
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            selectedArtist === artist.id ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default SearchArtist;