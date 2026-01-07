"use client";

import { useState } from "react";
import {
    Check,
    Edit2,
    Loader,
    Settings2,
    Crown,
    Zap,
    Star,
    Save,
    X,
    Info
} from "lucide-react";
import { useGetPlansQuery, useUpdatePlanMutation, Plan } from "@/lib/api/planApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const PlanCard = ({ plan, onEdit }: { plan: Plan; onEdit: (plan: Plan) => void }) => {
    const getIcon = (name: string) => {
        switch (name.toLowerCase()) {
            case "basic": return <Zap className="w-5 h-5 text-yellow-500" />;
            case "premium": return <Star className="w-5 h-5 text-yellow-500" />;
            case "vip": return <Crown className="w-5 h-5 text-yellow-500" />;
            default: return <Settings2 className="w-5 h-5 text-yellow-500" />;
        }
    };

    return (
        <div className={`relative flex flex-col p-6 rounded-2xl bg-zinc-900 border transition-all duration-300 ${plan.isPopular ? 'border-yellow-500/50 shadow-2xl shadow-yellow-500/10' : 'border-zinc-800'}`}>
            {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest px-5 py-1 rounded-full">
                    Most Popular
                </div>
            )}

            <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                    {getIcon(plan.name)}
                </div>
                <button
                    onClick={() => onEdit(plan)}
                    className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors border border-transparent hover:border-zinc-700"
                >
                    <Edit2 size={16} />
                </button>
            </div>

            <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1">{plan.publicName}</h3>
                <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white">${plan.price}</span>
                    <span className="text-zinc-500 text-sm font-medium">/{plan.interval}</span>
                </div>
            </div>

            <p className="text-zinc-400 text-sm mb-6 line-clamp-2 min-h-[40px]">
                {plan.description}
            </p>

            <div className="space-y-3 mt-auto">
                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Key Features</div>
                {plan.features.slice(0, 4).map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm">
                        <div className="p-0.5 rounded-full bg-yellow-500/10 text-yellow-500 mt-0.5">
                            <Check size={12} strokeWidth={3} />
                        </div>
                        <span className="text-zinc-300 leading-tight">{feature}</span>
                    </div>
                ))}
                {plan.features.length > 4 && (
                    <div className="text-xs text-zinc-500 pl-7 font-medium">
                        + {plan.features.length - 4} more features
                    </div>
                )}
            </div>
        </div>
    );
};

const PlanManagement = () => {
    const { data: plansData, isLoading, isError } = useGetPlansQuery();
    const [updatePlan, { isLoading: isUpdating }] = useUpdatePlanMutation();
    const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
    const [formData, setFormData] = useState({
        publicName: "",
        name: "",
        price: 0,
        isPopular: false,
        description: "",
        features: "",
        interval: "month" as "month" | "year" | "week"
    });

    const handleEdit = (plan: Plan) => {
        setEditingPlan(plan);
        setFormData({
            publicName: plan.publicName,
            name: plan.name,
            price: plan.price,
            isPopular: plan.isPopular,
            description: plan.description,
            features: plan.features.join("\n"),
            interval: plan.interval
        });
    };

    const handleUpdate = async () => {
        if (!editingPlan) return;

        try {
            await updatePlan({
                id: editingPlan.id,
                body: {
                    publicName: formData.publicName,
                    name: formData.name,
                    price: Number(formData.price),
                    isPopular: formData.isPopular,
                    description: formData.description,
                    features: formData.features.split("\n").filter(f => f.trim() !== ""),
                    interval: formData.interval,
                    planType: formData.interval === "year" ? "YEARLY" : "MONTHLY"
                }
            }).unwrap();

            toast.success("Plan updated successfully");
            setEditingPlan(null);
        } catch (err) {
            toast.error("Failed to update plan");
            console.error(err);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
                <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-zinc-400 font-medium animate-pulse tracking-wide">Retrieving Membership Plans...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="p-4 bg-red-500/10 rounded-full mb-4 border border-red-500/20">
                    <X className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">System Synchronisation Failure</h3>
                <p className="text-zinc-400 text-sm max-w-xs mt-2 font-medium">Unable to connect to the subscription matrix. Please verify network protocols.</p>
            </div>
        );
    }

    const plans = plansData?.data || [];

    return (
        <div className="w-full space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-zinc-800 pb-8">
                <div className="space-y-1">
                    <h2 className="text-3xl font-black text-white tracking-tight">Manage Plan </h2>
                    <p className="text-zinc-500 font-medium flex items-center gap-2">
                        <Info size={14} className="text-yellow-500" />
                        Adjust your membership packages, pricing, and features
                    </p>
                </div>
                <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/40"></div>
                    <span className="text-xs font-bold text-zinc-300 uppercase tracking-widest">Stripe Live Sync Active</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {plans.map((plan) => (
                    <PlanCard key={plan.id} plan={plan} onEdit={handleEdit} />
                ))}
            </div>

            <Dialog open={!!editingPlan} onOpenChange={() => setEditingPlan(null)}>
                <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-md p-8">
                    <DialogHeader className="mb-6">
                        <DialogTitle className="text-3xl font-black tracking-tight">Edit Membership Plan</DialogTitle>
                        <DialogDescription className="text-zinc-400 font-medium mt-2">
                            Update the details for this membership level. Changes will apply to all new subscribers.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 max-h-[60vh] overflow-y-auto px-1">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="publicName" className="text-xs font-bold uppercase tracking-widest text-zinc-500">Plan Name (Display Name)</Label>
                                <Input
                                    id="publicName"
                                    value={formData.publicName}
                                    onChange={(e) => setFormData({ ...formData, publicName: e.target.value })}
                                    className="bg-zinc-950 border-zinc-800 focus:border-yellow-500 focus:ring-yellow-500/20 h-10 font-bold"
                                    placeholder="e.g., Premium"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-zinc-500">Internal Reference Label</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="bg-zinc-950 border-zinc-800 focus:border-yellow-500 focus:ring-yellow-500/20 h-10 font-bold"
                                    placeholder="e.g., premium_2024"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="price" className="text-xs font-bold uppercase tracking-widest text-zinc-500">Price (USD)</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                    className="bg-zinc-950 border-zinc-800 focus:border-yellow-500 focus:ring-yellow-500/20 h-10 font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    placeholder="0.00"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="interval" className="text-xs font-bold uppercase tracking-widest text-zinc-500">Billing Interval</Label>
                                <Select
                                    value={formData.interval}
                                    onValueChange={(value: any) => setFormData({ ...formData, interval: value })}
                                >
                                    <SelectTrigger className="bg-zinc-950 border-zinc-800 focus:ring-yellow-500/20 h-10 font-bold">
                                        <SelectValue placeholder="Select interval" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                        <SelectItem value="week">Weekly</SelectItem>
                                        <SelectItem value="month">Monthly</SelectItem>
                                        <SelectItem value="year">Yearly</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-xs font-bold uppercase tracking-widest text-zinc-500">Tier Description</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="bg-zinc-950 border-zinc-800 focus:border-yellow-500 focus:ring-yellow-500/20 min-h-[80px] font-medium"
                                placeholder="Short description of the plan..."
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="features" className="text-xs font-bold uppercase tracking-widest text-zinc-500">Core Features (One per line)</Label>
                            <Textarea
                                id="features"
                                value={formData.features}
                                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                                className="bg-zinc-950 border-zinc-800 focus:border-yellow-500 focus:ring-yellow-500/20 min-h-[120px] font-medium"
                                placeholder="Feature 1&#10;Feature 2&#10;Feature 3..."
                            />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
                            <div className="space-y-0.5">
                                <Label className="text-sm font-bold text-white">Promoted Tier</Label>
                                <p className="text-xs text-zinc-500 font-medium">Highlight this plan as "Most Popular"</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, isPopular: !formData.isPopular })}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.isPopular ? 'bg-yellow-500' : 'bg-zinc-700'}`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.isPopular ? 'translate-x-6' : 'translate-x-1'}`}
                                />
                            </button>
                        </div>

                        <div className="p-4 bg-yellow-500/5 rounded-2xl border border-yellow-500/10 mt-2">
                            <div className="flex gap-3">
                                <Info className="w-5 h-5 text-yellow-500 shrink-0" />
                                <p className="text-xs text-zinc-400 font-medium leading-relaxed">
                                    Updating the price here will synchronise with the Stripe legacy system. Existing subscribers will maintain their current rate.
                                </p>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="mt-8 gap-3">
                        <Button
                            variant="ghost"
                            onClick={() => setEditingPlan(null)}
                            className="flex-1 h-12 font-bold tracking-wide hover:bg-zinc-800 text-zinc-400"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleUpdate}
                            disabled={isUpdating}
                            className="flex-1 h-12 bg-yellow-500 hover:bg-yellow-400 text-black font-black tracking-wide shadow-lg shadow-yellow-500/20"
                        >
                            {isUpdating ? <Loader className="animate-spin mr-2" /> : <Save className="mr-2" size={18} />}
                            Save Updates
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PlanManagement;
