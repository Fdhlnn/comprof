<?php

namespace App\Http\Controllers\Events;

use App\Models\Events;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class AdminEventsController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/events', [
            'events' => Events::latest()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'        => 'required|string',
            'description' => 'nullable|string',
            'content'     => 'required|string',
            'start_date'  => 'required|date',
            'end_date'    => 'required|date|after_or_equal:start_date',
            'location'    => 'nullable|string',
            'image'       => 'nullable|image|max:2048',
        ]);

        $now = Carbon::now();
        if ($now->lt(Carbon::parse($data['start_date']))) {
            $data['status'] = 'upcoming';
        } elseif ($now->between(Carbon::parse($data['start_date']), Carbon::parse($data['end_date']))) {
            $data['status'] = 'ongoing';
        } else {
            $data['status'] = 'past';
        }

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('events', 'public');
        }

        Events::create($data);

        return redirect()->route('admin.events');
    }

    public function update(Request $request, Events $events)
    {
        $data = $request->validate([
            'name'        => 'required|string',
            'description' => 'nullable|string',
            'content'     => 'required|string',
            'start_date'  => 'required|date',
            'end_date'    => 'required|date|after_or_equal:start_date',
            'location'    => 'nullable|string',
            'image'       => 'nullable|image|max:2048',
        ]);

        $now = Carbon::now();
        if ($now->lt(Carbon::parse($data['start_date']))) {
            $data['status'] = 'upcoming';
        } elseif ($now->between(Carbon::parse($data['start_date']), Carbon::parse($data['end_date']))) {
            $data['status'] = 'ongoing';
        } else {
            $data['status'] = 'past';
        }

        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($events->image);
            $data['image'] = $request->file('image')->store('events', 'public');
        }

        $events->update($data);

        return redirect()->route('admin.events');
    }

    public function destroy(Events $events)
    {
        Storage::disk('public')->delete($events->image);
        $events->delete();

        return redirect()->route('admin.events');
    }
}
