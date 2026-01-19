
"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSettings, type Settings } from "@/hooks/use-settings";
import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsPage() {
    const { settings: initialSettings, saveSettings, isLoading } = useSettings();
    const [currentSettings, setCurrentSettings] = useState<Settings | null>(null);

    useEffect(() => {
        if (initialSettings) {
            setCurrentSettings(initialSettings);
        }
    }, [initialSettings]);

    const handleThresholdChange = (field: keyof Settings, value: string) => {
        if (!currentSettings) return;
        const numericValue = Number(value);
        if (!isNaN(numericValue)) {
            setCurrentSettings({ ...currentSettings, [field]: numericValue });
        }
    };
    
    const handleSaveChanges = () => {
        if (currentSettings) {
            saveSettings(currentSettings);
            toast({
                title: "Settings Saved",
                description: "Your model parameters have been updated.",
            });
        }
    };

    const handleMockAction = (title: string, description: string) => {
        toast({
            title: title,
            description: description,
        })
    }

    if (isLoading || !currentSettings) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-12 w-1/3" />
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-56 w-full" />
            </div>
        )
    }
    
    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold font-headline text-foreground">Settings</h1>
                <p className="text-muted-foreground">Configure system settings and model parameters.</p>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Model Parameters</CardTitle>
                    <CardDescription>Adjust the thresholds for the student risk prediction model.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="high-risk-threshold">High-Risk Threshold (GPA)</Label>
                            <Input id="high-risk-threshold" type="number" value={currentSettings.highRiskThreshold} onChange={e => handleThresholdChange('highRiskThreshold', e.target.value)} max="10" min="0" step="0.1" />
                            <p className="text-sm text-muted-foreground">GPA below this value will be considered high-risk.</p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="medium-risk-threshold">Medium-Risk Threshold (GPA)</Label>
                            <Input id="medium-risk-threshold" type="number" value={currentSettings.mediumRiskThreshold} onChange={e => handleThresholdChange('mediumRiskThreshold', e.target.value)} max="10" min="0" step="0.1" />
                            <p className="text-sm text-muted-foreground">GPA below this value (but above high-risk) will be medium-risk.</p>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="low-risk-threshold">Low-Risk Threshold (GPA)</Label>
                            <Input id="low-risk-threshold" type="number" value={currentSettings.lowRiskThreshold} onChange={e => handleThresholdChange('lowRiskThreshold', e.target.value)} max="10" min="0" step="0.1" />
                            <p className="text-sm text-muted-foreground">GPA below this value (but above medium-risk) will be considered low-risk.</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button onClick={handleSaveChanges}>Save Changes</Button>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>Manage automated email alerts for at-risk students.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <Label htmlFor="high-risk-alerts" className="text-base">High-Risk Alerts</Label>
                            <p className="text-sm text-muted-foreground">Receive an email when a student is flagged as high-risk.</p>
                        </div>
                        <Switch id="high-risk-alerts" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <Label htmlFor="weekly-summary" className="text-base">Weekly Summary</Label>
                             <p className="text-sm text-muted-foreground">Get a weekly report of all medium and high-risk students.</p>
                        </div>
                        <Switch id="weekly-summary" />
                    </div>
                </CardContent>
                 <CardFooter className="border-t px-6 py-4">
                    <Button onClick={() => handleMockAction("Settings Saved", "Your notification settings have been updated (mock action).")}>Save Notification Settings</Button>
                </CardFooter>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Data Management</CardTitle>
                    <CardDescription>Manage application data and caching.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label>Export Data</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a format" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="csv">Export as CSV</SelectItem>
                                <SelectItem value="json">Export as JSON</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button className="w-full" onClick={() => handleMockAction("Data Export Started", "A full data export has been initiated (mock action).")}>Export All Student Data</Button>
                    </div>
                     <div className="space-y-2">
                        <Label>Cache Management</Label>
                         <p className="text-sm text-muted-foreground pb-2">Clearing the cache will remove all stored student data from your browser.</p>
                        <Button className="w-full" variant="destructive" onClick={() => {
                            localStorage.removeItem('gradex_students');
                            localStorage.removeItem('gradex_settings');
                            toast({variant: "destructive", title: "Cache Cleared", description: "Please refresh the page to reload initial data."})
                        }}>Clear Local Cache</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
