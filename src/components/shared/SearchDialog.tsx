import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { handleSearch } from '@/actions/search.action';

interface SearchDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg backdrop-blur">
                <form action={handleSearch} className="grid gap-4 py-4">
                    <div className="relative">
                        <Input
                            id="searchQuery"
                            name="searchQuery"
                            placeholder="Search..."
                            className="pr-24"
                            required
                        />
                        <div className="absolute right-0 top-0 flex gap-1">
                            <Button
                                type="reset"
                                variant="ghost"
                                size="icon"
                                className="hidden data-[state=filled]:block"
                                onClick={() => {
                                    const input = document.getElementById(
                                        'searchQuery',
                                    ) as HTMLInputElement;
                                    if (input) input.value = '';
                                }}
                            >
                                <X className="size-5" />
                            </Button>

                            <Button type="submit" size="icon">
                                <Search className="size-5" />
                            </Button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
