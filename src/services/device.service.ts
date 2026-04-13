export async function deleteDevice(id: number) {
	try {
		const response = await axios.delete(`${DEVICES_API_URL}/${id}`);
		return response.data;
	} catch (error: any) {
		throw error.response?.data || error;
	}
}
export async function updateDevice(id: number, device: Device) {
	try {
		const response = await axios.patch(`${DEVICES_API_URL}/${id}`, device, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return response.data;
	} catch (error: any) {
		throw error.response?.data || error;
	}
}
export async function getDeviceById(id: number) {
	try {
		const response = await axios.get(`${DEVICES_API_URL}/${id}`);
		return response.data;
	} catch (error: any) {
		throw error.response?.data || error;
	}
}
export async function getDevices() {
	try {
		const response = await axios.get(DEVICES_API_URL);
		return response.data;
	} catch (error: any) {
		throw error.response?.data || error;
	}
}
import axios from 'axios';

const DEVICES_API_URL = '/api/v1/devices';

export interface Device {
	deviceName: string;
	isActive: boolean;
}

export async function createDevice(device: Device) {
	try {
		const response = await axios.post(DEVICES_API_URL, device, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return response.data;
	} catch (error: any) {
		throw error.response?.data || error;
	}
}
