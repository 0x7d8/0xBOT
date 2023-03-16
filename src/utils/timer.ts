export class Timer {
	private isRunning: boolean
	private startTime: number
	private overallTime: number

	constructor () {
		this.isRunning = false
		this.startTime = 0
		this.overallTime = 0
	}

	private getTimeElapsedSinceLastStart () {
		if (!this.startTime) return 0

		return Date.now() - this.startTime
	}

	public start() {
		if (this.isRunning) return console.error('Timer is already running')

		this.isRunning = true
		this.startTime = Date.now()
	}

	public stop() {
		if (!this.isRunning) return console.error('Timer is already stopped')

		this.isRunning = false
		this.overallTime = this.overallTime + this.getTimeElapsedSinceLastStart()
	}

	public reset() {
		this.overallTime = 0

		if (this.isRunning) return this.startTime = Date.now()

		this.startTime = 0
	}

	public getTime() {
		if (!this.startTime) return 0
		if (this.isRunning) return this.overallTime + this.getTimeElapsedSinceLastStart()

		return this.overallTime
	}
}