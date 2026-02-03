<?php

namespace App\Http\Controllers\Events;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Events;
use Inertia\Inertia;
use Carbon\Carbon;

class UserEventsController extends Controller
{
    public function index()
    {
        $events = Events::orderBy('start_date', 'asc')->get();

        $events = $events->map(function ($event) {
            $start = Carbon::parse($event->start_date);
            $end = Carbon::parse($event->end_date);
            $today = Carbon::today();

            // Tentukan status otomatis
            if ($today->lt($start)) {
                $status = 'upcoming';
            } elseif ($today->between($start, $end)) {
                $status = 'ongoing';
            } else {
                $status = 'past';
            }

            return [
                'id' => $event->id,
                'title' => $event->name,
                'description' => $event->content,
                'date' => $start->format('Y-m-d') . ' – ' . $end->format('Y-m-d'),
                'location' => $event->location,
                'image' => $event->image ? '/storage/' . $event->image : null,
                'status' => $status,
            ];
        });

        return Inertia::render('comprof/events', [
            'events' => $events,
        ]);
    }

    public function show($id)
    {
        $event = Events::findOrFail($id);

        $start = $event->start_date ? Carbon::parse($event->start_date) : null;
        $end   = $event->end_date ? Carbon::parse($event->end_date) : null;
        $today = Carbon::today();

        // Status sama persis
        if ($start && $today->lt($start)) {
            $status = 'upcoming';
        } elseif ($start && $end && $today->between($start, $end)) {
            $status = 'ongoing';
        } else {
            $status = 'past';
        }

        return Inertia::render('comprof/detail-event', [
            'event' => [
                'id' => $event->id,
                'title' => $event->name,
                'description' => $event->content,
                'date' => $start && $end
                    ? $start->format('Y-m-d') . ' – ' . $end->format('Y-m-d')
                    : null,
                'location' => $event->location,
                'image' => $event->image ? '/storage/' . $event->image : null,
                'status' => $status,
            ],
        ]);
    }
}
