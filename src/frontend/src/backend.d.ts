import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface HeartRateReading {
    status: ReadingStatus;
    value: bigint;
    timestamp: bigint;
}
export interface EmergencyAlert {
    id: bigint;
    status: AlertStatus;
    patient: Principal;
    type: AlertType;
    timestamp: bigint;
    severity: AlertSeverity;
}
export interface EmergencyContact {
    relationship: string;
    name: string;
    phone: string;
}
export interface ConditionNote {
    name: string;
    type: string;
    description: string;
}
export interface UserProfile {
    age: bigint;
    knownConditionNoteId: string;
    name: string;
    emergencyContactsId: string;
    address: string;
}
export enum AlertSeverity {
    low = "low",
    high = "high",
    medium = "medium"
}
export enum AlertStatus {
    resolved = "resolved",
    newAlert = "newAlert",
    dispatched = "dispatched",
    acknowledged = "acknowledged"
}
export enum AlertType {
    automatic = "automatic",
    manual = "manual"
}
export enum ReadingStatus {
    warning = "warning",
    normal = "normal",
    critical = "critical"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addControlRoomUser(user: Principal): Promise<void>;
    addHeartRateReading(reading: HeartRateReading): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createEmergencyAlert(type: AlertType, severity: AlertSeverity): Promise<bigint>;
    getAlertDetails(alertId: bigint): Promise<EmergencyAlert>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getFullProfile(user: Principal): Promise<[UserProfile, Array<EmergencyContact>, Array<ConditionNote>]>;
    getHeartRateReadings(user: Principal): Promise<Array<HeartRateReading>>;
    getPendingAlerts(): Promise<Array<EmergencyAlert>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isControlRoomUser(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveUserProfileWithContactNote(profile: UserProfile, contacts: Array<EmergencyContact>, notes: Array<ConditionNote>): Promise<void>;
    updateAlertStatus(alertId: bigint, status: AlertStatus): Promise<void>;
}
