import connectToDB from "@/lib/db";
import Project from '@/models/Project';
import { requireAuth } from "@/lib/requireAuth";

export default async function DashboardPage() {
    const session = await requireAuth();

    await connectToDB();

    const projects = await Project.find({
        ownerId: session.userId,
    });

    return (
        <div>
            <h1>My projects</h1>
            <ul>
                {projects.map((project) => (
                    <li key={`${project._id}`}>{project.name}</li>
                ))}
            </ul>
        </div>
    )
}