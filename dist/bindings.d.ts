/** user-defined commands **/
export declare const commands: {
    clipboardRead(): Promise<Result<ClipboardReadResult, string>>;
    clipboardWriteText(text: string): Promise<Result<null, string>>;
    clipboardWriteFiles(paths: string[]): Promise<Result<null, string>>;
    clipboardWriteImage(png: number[]): Promise<Result<null, string>>;
    notify(opts: NotificationOptions): Promise<Result<null, string>>;
    notificationPermissionState(): Promise<Result<string, string>>;
    notificationRequestPermission(): Promise<Result<boolean, string>>;
    hotkeyRegister(appId: string, combo: string): Promise<Result<string, string>>;
    hotkeyUnregister(appId: string, combo: string): Promise<Result<null, string>>;
    hotkeyIsRegistered(appId: string, combo: string): Promise<Result<boolean, string>>;
    fsReadText(appId: string, relPath: string): Promise<Result<string, string>>;
    fsReadBytes(appId: string, relPath: string): Promise<Result<number[], string>>;
    fsWriteText(appId: string, relPath: string, contents: string): Promise<Result<null, string>>;
    fsWriteBytes(appId: string, relPath: string, contents: number[]): Promise<Result<null, string>>;
    autostartIsEnabled(): Promise<Result<boolean, string>>;
    autostartSet(enabled: boolean): Promise<Result<boolean, string>>;
    /**
     * Physical bounds the overlay window covers (virtual desktop minus taskbar strip).
     */
    monitorOverlayBounds(): Promise<Bounds>;
    /**
     * Physical bounds of the combined virtual desktop (all monitors unioned).
     */
    monitorVirtualDesktopBounds(): Promise<Bounds>;
    modsReadAutoloadIds(): Promise<Result<string[], string>>;
    modsSetAutoloadIds(ids: string[]): Promise<Result<null, string>>;
    /**
     * Base URL (loopback) of the running mod server: `http://127.0.0.1:<port>`.
     */
    modsBaseUrl(): Promise<Result<string, string>>;
    modsList(): Promise<Result<InstalledMod[], string>>;
    modsInstall(path: string, forceReplace: boolean): Promise<Result<InstallResult, string>>;
    elxrPeek(path: string): Promise<Result<ElxrPeek, string>>;
    /**
     * On-demand foreground window snapshot.
     */
    foregroundWindow(): Promise<Result<ForegroundWindow, string>>;
    dbExecute(appId: string, sql: string, params: DbValue[]): Promise<Result<number, string>>;
    dbQuery(appId: string, sql: string, params: DbValue[]): Promise<Result<QueryResult, string>>;
    dbIsAppRegistered(appId: string): Promise<boolean>;
    audioStartRecording(appId: string, options: AudioOptions | null): Promise<Result<null, string>>;
    audioStopRecording(appId: string): Promise<Result<RecordedAudio, string>>;
    audioIsRecording(appId: string): Promise<boolean>;
};
/** user-defined events **/
export declare const events: {
    audioLevel: __EventObj__<AudioLevel> & ((handle: __WebviewWindow__) => __EventObj__<AudioLevel>);
    cursorMoved: __EventObj__<CursorMoved> & ((handle: __WebviewWindow__) => __EventObj__<CursorMoved>);
    elxrOpen: __EventObj__<ElxrOpen> & ((handle: __WebviewWindow__) => __EventObj__<ElxrOpen>);
    engineSecondInstance: __EventObj__<SecondInstance> & ((handle: __WebviewWindow__) => __EventObj__<SecondInstance>);
    foregroundChanged: __EventObj__<ForegroundChanged> & ((handle: __WebviewWindow__) => __EventObj__<ForegroundChanged>);
    hotkeyPressed: __EventObj__<HotkeyPressed> & ((handle: __WebviewWindow__) => __EventObj__<HotkeyPressed>);
};
/** user-defined constants **/
/** user-defined types **/
/**
 * RMS-derived 0..1 level meter, emitted ~20x/sec while recording.
 */
export type AudioLevel = {
    app_id: string;
    level: number;
    peak: number;
};
export type AudioOptions = {
    sample_rate?: number;
    channels?: number;
};
export type Bounds = {
    x: number;
    y: number;
    width: number;
    height: number;
};
/**
 * Discriminated clipboard snapshot. Serde shape (internally tagged on `kind`):
 * `{ kind: "image", png } | { kind: "files", paths } | { kind: "text", text, sourceUrl } | { kind: "empty" }`.
 */
export type ClipboardReadResult = {
    kind: "image";
    png: number[];
} | {
    kind: "files";
    paths: string[];
} | {
    kind: "text";
    text: string;
    sourceUrl: string | null;
} | {
    kind: "empty";
};
/**
 * Global cursor position in CSS pixels relative to the overlay window's top-left.
 * Mirrors the `CursorPosition` payload hit-regions-rs emits; declared here so the
 * type is in `bindings.ts`. The event itself is emitted by hit-regions-rs' poll thread.
 */
export type CursorMoved = {
    x: number;
    y: number;
};
/**
 * A specta-friendly SQL value. `Array`/`Object` exist for API completeness but
 * are rejected as bind params by sqlite.
 */
export type DbValue = null | number | string | number[] | DbValue[] | Partial<{
    [key in string]: DbValue;
}>;
/**
 * A `.elxr` file was opened (double-click) and its manifest peeked.
 */
export type ElxrOpen = {
    path: string;
    manifest: ModManifest;
    iconDataUrl?: string | null;
    sizeBytes: number;
};
/**
 * Result of peeking inside a `.elxr` before unpacking.
 */
export type ElxrPeek = {
    manifest: ModManifest;
    iconDataUrl?: string | null;
    sizeBytes: number;
};
/**
 * The currently-active (foreground) window; emitted only on change (~250 ms poll).
 */
export type ForegroundChanged = {
    window: ForegroundWindow;
};
/**
 * Snapshot of the currently-active (foreground) window: title + owning process +
 * fullscreen state. Produced by `window_info` (Task 3); declared here because
 * events is the compile-order-first module.
 */
export type ForegroundWindow = {
    title: string;
    process_name: string;
    process_id: number;
    is_fullscreen: boolean;
    is_engine_window: boolean;
};
/**
 * A registered global hotkey was pressed; payload is the owning app id + normalized combo.
 */
export type HotkeyPressed = {
    app_id: string;
    combo: string;
};
export type InstallResult = {
    manifest: ModManifest;
    entryUrl: string;
};
export type InstalledMod = {
    id: string;
    name: string;
    entry: string;
    version?: string | null;
    author?: string | null;
    icon?: string | null;
    iconUrl?: string | null;
    description?: string | null;
    entryUrl: string;
};
/**
 * A mod's `manifest.json`.
 */
export type ModManifest = {
    id: string;
    name: string;
    version?: string | null;
    author?: string | null;
    icon?: string | null;
    description?: string | null;
    entry?: string;
};
export type NotificationOptions = {
    title: string;
    body: string;
};
export type QueryResult = {
    columns: string[];
    rows: DbValue[][];
};
/**
 * Output WAV is always mono/16k; the fields reflect the file (16000/1).
 */
export type RecordedAudio = {
    wav_bytes: number[];
    duration_ms: number;
    peak: number;
    sample_rate: number;
    channels: number;
};
/**
 * Fired by the single-instance plugin callback when a second launch occurs.
 */
export type SecondInstance = {
    argv: string[];
    cwd: string;
};
import * as TAURI_API_EVENT from "@tauri-apps/api/event";
import { type WebviewWindow as __WebviewWindow__ } from "@tauri-apps/api/webviewWindow";
type __EventObj__<T> = {
    listen: (cb: TAURI_API_EVENT.EventCallback<T>) => ReturnType<typeof TAURI_API_EVENT.listen<T>>;
    once: (cb: TAURI_API_EVENT.EventCallback<T>) => ReturnType<typeof TAURI_API_EVENT.once<T>>;
    emit: null extends T ? (payload?: T) => ReturnType<typeof TAURI_API_EVENT.emit> : (payload: T) => ReturnType<typeof TAURI_API_EVENT.emit>;
};
export type Result<T, E> = {
    status: "ok";
    data: T;
} | {
    status: "error";
    error: E;
};
export {};
