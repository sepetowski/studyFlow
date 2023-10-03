import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
	const { name, email, password }: { name: string; email: string; password: string } =
		await request.json();

	if (!name || !email || !password) {
		return new NextResponse('Missing Fields.', { status: 400 });
	}
	const userName = await db.user.findUnique({
		where: {
			name: name,
		},
	});

	if (userName) return new NextResponse('This username is taken', { status: 202 });

	const existedUser = await db.user.findUnique({
		where: {
			email,
		},
	});

	if (existedUser) return new NextResponse('Email is already in use.', { status: 201 });

	const hashedPassword = await bcrypt.hash(password, 10);

	try {
		const newUser = await db.user.create({
			data: {
				name: name,
				email,
				hashedPassword,
			},
		});

		return NextResponse.json(newUser, { status: 200 });
	} catch (err) {
		let errMsg = 'Database Error';
		if (typeof err === 'string') {
			errMsg = err;
		} else if (err instanceof Error) {
			errMsg = err.message;
		}
		return new NextResponse(errMsg, { status: 500, statusText: errMsg });
	}
}
